import { Link } from "react-router-dom";

const RoundedButton = ({
  text,
  to,
  bgColor = "bg-red-600",
  textColor = "text-white",
}) => {
  const classNames = `px-6 py-2 rounded-full font-semibold ${bgColor} ${textColor} hover:opacity-90 transition`;

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {text}
      </Link>
    );
  }

  return <button className={classNames}>{text}</button>;
};

export default RoundedButton;
