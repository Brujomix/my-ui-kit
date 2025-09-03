import { QRCodeCanvas } from "qrcode.react";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
<rect width="100" height="100" rx="20" ry="20" fill="#DDD"/>
<text x="50%" y="50%" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-size="28" fill="#000">
  OnF
</text>
</svg>
`;

const svgBase64 = "data:image/svg+xml;base64," + btoa(svg);

type GeneratorQRProps = {
  text? : string
  size? : number
}

export function GeneratorQr({text, size} : GeneratorQRProps) {
  return (
    <QRCodeCanvas
      value={text ?? ""}
      size={size ?? 90}
      bgColor="#FFFFFF"
      fgColor="#000"
      level="H"
      imageSettings={{
        src: svgBase64,
        x: undefined,
        y: undefined,
        height: 10,
        width: 10,
        excavate: true, // elimina parte del QR detrás de la imagen
      }}
    />
  );
}
