interface Clipboard {
  write: (data: ClipboardItem[]) => Promise;
}

type DataType = 'text/plain' | 'image/png' | any;

declare class ClipboardItem {
  constructor(options: Record<DataType, any>);
}
