import crypto from "crypto";
import QRCode from "qrcode";

const generateBookingQRCode = async () => {
  const qrToken = crypto.randomUUID();

  const qrImage = await QRCode.toDataURL(qrToken);

  return {
    qrToken,
    qrImage,
  };
};

export { generateBookingQRCode };
