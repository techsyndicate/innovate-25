import { useEffect, useState } from "react";

export const FetchUser = async (userId: string) => {
  fetch("/api/getUser");
};
