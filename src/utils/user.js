import { isEmpty } from "lodash";

export function getProfile(user, id) {
  if (user == null || isEmpty(user)) {
    return null
  }
  if (id === "user") {
    return {
      first_name: user?.name?.split(" ")[0],
      last_name: user?.name?.split(" ")[1],
      name: user.name,
      id: "user",
    };
  } else {
    const profile = user.dependents.find((d) => d.id === id);
    return { name: `${profile?.first_name} ${profile?.last_name}`, isDependent: true, ...profile };
  }
}
