import { User } from "../../../../../data/types";

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getPropertyValue = (
  obj: User,
  propertyPath: string | string[]
): string => {
  if (Array.isArray(propertyPath)) {
    const values = propertyPath.map((prop) => getProperty(obj, prop));
    return values.join(" ");
  } else {
    return String(getProperty(obj, propertyPath));
  }
};

const getProperty = (obj: any, prop: string) => {
  const properties = prop.split(".");
  let value = obj;
  for (const property of properties) {
    if (value && typeof value === "object" && property in value) {
      value = value[property];
    } else {
      return ""; // Return an empty string if the property is not found
    }
  }
  return value;
};
