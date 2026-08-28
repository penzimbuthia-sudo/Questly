function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={`px-6 py-4 border-b border-line/10 ${className}`}>
      {children}
    </div>
  );
}

function CardBody({ children, className = "", ...props }) {
  return (
    <div {...props} className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div {...props} className={`px-6 py-4 border-t border-line/10 ${className}`}>
      {children}
    </div>
  );
}

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-2xl bg-card border border-line/10 ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;