import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";


export function ProfileInfoCard({ title, description, details, action }) {

  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4 rounded-none"
      >
        <Typography variant="h6" className="text-light-text dark:text-dark-text">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0">
        {description && (
          <Typography
            variant="small"
            className="font-normal text-light-text-secondary dark:text-dark-text-secondary"
          >
            {description}
          </Typography>

        )}
        {description && details ? (
          <hr className="my-8 border-blue-gray-500 dark:border-white" />
        ) : null}
        {details && (
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  className="font-semibold capitalize text-light-text dark:text-dark-text"
                >
                  {el}:
                </Typography>
                {typeof details[el] === "string" ? (
                  <Typography
                    variant="small"
                    className="font-normal text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    {details[el]}
                  </Typography>
                ) : (
                  details[el]
                )}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
