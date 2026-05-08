# 🎉 Color Catcher v1.2 Release Notes

## 🆕 Major New Features

### 🌈 OKLCH Color Format Support
The most significant addition in v1.2 is support for the modern OKLCH color space:

- **Perceptually Uniform**: OKLCH provides better perceptual uniformity than traditional HSL
- **Modern Standard**: Part of the latest CSS Color Module Level 4 specification
- **Professional Precision**: 2 decimal place accuracy for professional color work
- **Future-Ready**: Prepares your workflow for next-generation color tools

### 🎨 Enhanced User Interface
Updated interface to accommodate the new OKLCH format while maintaining polish:

- **Optimized Layout**: Adjusted spacing and dimensions for 5 color formats
- **Pixel-Perfect**: Maintained consistent design language
- **Responsive**: Better adaptation to different window sizes
- **Intuitive**: OKLCH seamlessly integrated with existing formats

## 🔧 Technical Improvements

### Advanced Color Conversion
- **RGB → Linear RGB**: Proper gamma correction for accurate conversion
- **Linear RGB → XYZ**: Scientific color space transformation
- **XYZ → OKLab**: Perceptually uniform intermediate space
- **OKLab → OKLCH**: Polar coordinate conversion for intuitive hue/chroma

### Precision & Performance
- **2 Decimal Places**: Professional-grade precision for OKLCH values
- **Optimized Calculations**: Efficient color space conversions
- **Memory Efficient**: Minimal performance impact

## 🎯 What's New

### Color Formats Now Supported:
- ✅ **HEX**: Traditional web color format
- ✅ **RGB**: Red, Green, Blue values
- ✅ **HSL**: Hue, Saturation, Lightness
- ✅ **CSS**: CSS rgb() function format
- ✅ **OKLCH**: Lightness, Chroma, Hue (NEW!)
- ✅ **CMYK**: Cyan, Magenta, Yellow, Key (Black) percentages

### User Experience:
- Updated onboarding to mention OKLCH support
- Seamless integration with existing copy functionality
- Maintained visual consistency across all formats

## 🧪 How OKLCH Works

OKLCH (OK Lab to LCH) conversion process:
1. **Linear RGB**: Apply gamma correction to Figma's RGB values
2. **XYZ Transform**: Convert to CIE XYZ color space (D65 illuminant)
3. **OKLab**: Transform to perceptually uniform OKLab space
4. **OKLCH**: Convert to polar coordinates (Lightness, Chroma, Hue)

## 🎨 Example Usage

### Before v1.2:
```
#FF6B6B → HEX, RGB, HSL, CSS formats only
```

### After v1.2:
```
#FF6B6B → HEX, RGB, HSL, CSS + oklch(0.63 0.22 29.23)
```

## 🐛 Bug Fixes
- Improved color conversion precision
- Better handling of edge cases in color space transformations
- Enhanced error handling for invalid color inputs

## 🚀 Performance
- Optimized OKLCH conversion algorithms
- Minimal performance impact for existing formats
- Efficient memory usage for complex calculations

## 📱 Compatibility
- ✅ Figma Desktop App
- ✅ Figma Web App  
- ✅ All operating systems
- ✅ Modern browsers with OKLCH support
- ✅ Fallback for browsers without OKLCH support

## 🔮 Why OKLCH Matters

- **Perceptual Uniformity**: Equal numerical changes produce equal perceptual changes
- **Better Gradients**: Smoother, more natural color transitions
- **Accessibility**: Improved color contrast calculations
- **Future-Proof**: Aligns with modern CSS specifications

## 🎯 Perfect For

- **Color Scientists**: Precise color measurement and analysis
- **Design Systems**: More accurate color relationships
- **Advanced Gradients**: Better perceptual color transitions
- **Modern Web Development**: Future-ready color workflows

---

## 🙏 Thank You!
Continued thanks to the design community for driving innovation. Your feedback shapes the future of color tools in Figma!

**Experience the future of color with OKLCH support! 🌈✨**

---

*Plugin ID: 1605725747312426245*
