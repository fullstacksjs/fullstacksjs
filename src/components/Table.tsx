import { cn } from '@/utils/cn';

const Table = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full">
    <table
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn('text-xs text-fg-1 font-semibold', className)}
    {...props}
  />
);

const TableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

const TableFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot
    className={cn('bg-primary font-medium text-primary-foreground', className)}
    {...props}
  />
);

const TableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn('border-b border-bg-muted transition-colors', className)}
    {...props}
  />
);

const TableHead = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn('text-start font-semibold align-middle pb-4', className)}
    {...props}
  />
);

const TableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('align-middle py-6', className)} {...props} />
);

const TableCaption = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
);

export {
  TableBody as Body,
  TableCaption as Caption,
  TableCell as Cell,
  TableFooter as Footer,
  TableHead as Head,
  TableHeader as Header,
  Table as Root,
  TableRow as Row,
};
