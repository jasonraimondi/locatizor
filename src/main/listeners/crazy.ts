// import piexif from "piexifjs";
// import fs from "fs";
//
// const filename1 = "in.jpg";
// const filename2 = "out.jpg";
//
// const jpeg = fs.readFileSync(filename1);
// const data = jpeg.toString("binary");
//
// const exif: any = {};
// gps[piexif.TagValues.GPSIFD.GPSLatitude] = latitude;
// gps[piexif.TagValues.GPSIFD.GPSLongitude] = longitude;
// const exifObj = { "0th": zeroth, Exif: exif, GPS: gps };
// const exifbytes = piexif.dump(exifObj);
//
// const newData = piexif.insert(exifbytes, data);
// const newJpeg = Buffer.from(newData, "binary");
// fs.writeFileSync(filename2, newJpeg);

// var lat = 59.43553989213321;
// var lng = 24.73842144012451;
// gpsIfd[piexif.TagValues.GPSIFD.GPSLatitudeRef] = lat < 0 ? 'S' : 'N';
// gpsIfd[piexif.TagValues.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(lat);
// gpsIfd[piexif.TagValues.GPSIFD.GPSLongitudeRef] = lng < 0 ? 'W' : 'E';
// gpsIfd[piexif.TagValues.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(lng);
