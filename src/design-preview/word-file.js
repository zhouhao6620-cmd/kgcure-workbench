// Minimal valid OpenXML package: same local preview text, no external service.
export function downloadWord(name, text) {
  const encode = s => new TextEncoder().encode(s);
  const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const document = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + text.split('\n').map(line=>'<w:p><w:r><w:t xml:space="preserve">'+escape(line)+'</w:t></w:r></w:p>').join('')+'<w:sectPr/></w:body></w:document>';
  const entries = [['[Content_Types].xml','<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],['_rels/.rels','<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],['word/document.xml',document]];
  const crc32 = bytes => {let n=0xffffffff;for(const byte of bytes){n^=byte;for(let i=0;i<8;i++)n=(n>>>1)^((n&1)?0xedb88320:0);}return (n^0xffffffff)>>>0;};
  const local=[],central=[];let offset=0;
  for(const [path,body] of entries){
    const filename=encode(path),data=encode(body),crc=crc32(data);
    const header=new Uint8Array(30),v=new DataView(header.buffer);
    v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,filename.length,true);
    const cd=new Uint8Array(46),c=new DataView(cd.buffer);
    c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,filename.length,true);c.setUint32(42,offset,true);
    local.push(header,filename,data);central.push(cd,filename);offset+=header.length+filename.length+data.length;
  }
  const cdSize=central.reduce((sum,x)=>sum+x.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);
  e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,cdSize,true);e.setUint32(16,offset,true);
  const url=URL.createObjectURL(new Blob([...local,...central,end],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}));
  const link=documentElement();link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function documentElement(){ return document.createElement('a'); }
