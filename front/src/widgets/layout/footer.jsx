import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2 flex justify-center">
      <div className="flex flex-col items-center text-center w-full px-2">
        <Typography variant="small" className="font-normal text-black">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
          <span className="font-bold transition-colors hover:text-feel-3">
            {brandName}
          </span>{" "}
          for a better team flow.
        </Typography>
      </div>
    </footer>
  );
}

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
