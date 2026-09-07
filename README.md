import cv2
import numpy as np
import matplotlib.pyplot as plt

def process_metal_part(image_path):
    # 1. Load image
    img = cv2.imread(image_path)
    if img is None:
        print("Image not found!")
        return
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 2. Enhance contrast using CLAHE (critical for low-contrast metal parts)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    
    # 3. Locate the center and outer radius using Hough Circles
    blurred = cv2.GaussianBlur(enhanced, (9, 9), 2)
    circles = cv2.HoughCircles(
        blurred, 
        cv2.HOUGH_GRADIENT, 
        dp=1.2, 
        minDist=100, 
        param1=50, 
        param2=40, 
        minRadius=150, 
        maxRadius=400
    )
    
    if circles is None:
        print("No circular part detected. Try tweaking Hough parameters.")
        return

    circles = np.uint16(np.around(circles))
    cx, cy, r = circles[0][0]  # Get primary outer circle center & radius
    
    # 4. Extract ROI (Crop around center)
    margin = 20
    x1, y1 = max(0, cx - r - margin), max(0, cy - r - margin)
    x2, y2 = min(img.shape[1], cx + r + margin), min(img.shape[0], cy + r + margin)
    roi = img[y1:y2, x1:x2]
    
    # 5. Polar Warp (Unroll the circle into a straight rectangle for defect check)
    flags = cv2.WARP_POLAR_LINEAR
    unrolled = cv2.warpPolar(enhanced, (360, r + 20), (cx, cy), r + 20, flags)
    
    # 6. Analyze Variance along the outer edge to spot defects/breaks
    edge_strip = unrolled[int(r*0.85):int(r*1.05), :]
    edge_profile = np.mean(edge_strip, axis=0)
    std_dev = np.std(edge_profile)
    
    # Defect Scoring based on rim irregularity
    if std_dev < 15:
        status, color = "PASS: Uniform Circle", (0, 255, 0)
    elif std_dev < 28:
        status, color = "DEFECT: Minor Rim Notch/Dent", (0, 255, 255)
    else:
        status, color = "FAIL: Damaged / Broken Edge", (0, 0, 255)
        
    # Draw circle overlay on original image
    annotated = cv2.cvtColor(enhanced, cv2.COLOR_GRAY2RGB)
    cv2.circle(annotated, (cx, cy), r, color, 3)
    cv2.circle(annotated, (cx, cy), 4, (255, 0, 0), -1)
    
    # --- DISPLAY IN JUPYTER ---
    fig, axes = plt.subplots(1, 3, figsize=(16, 5))
    
    axes[0].imshow(cv2.cvtColor(roi, cv2.COLOR_BGR2RGB))
    axes[0].set_title("1. Extracted ROI (Target Area)")
    axes[0].axis('off')
    
    axes[1].imshow(annotated)
    axes[1].set_title(f"2. Circle Detection: {status}")
    axes[1].axis('off')
    
    axes[2].imshow(unrolled, cmap='gray')
    axes[2].set_title("3. Polar Unrolled Edge (Defect Profile)")
    axes[2].set_ylabel("Radius (Center -> Edge)")
    axes[2].set_xlabel("Angle (0° -> 360°)")
    
    plt.tight_layout()
    plt.show()

# Run the pipeline
# process_metal_part("metal_ring.jpg")
