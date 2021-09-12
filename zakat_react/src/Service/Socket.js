import io from "socket.io-client";
import { constants } from "../utils/constants";

// export const socket = io(constants.SOCKET_URL);

export const socket = io.connect(constants.SOCKET_URL, {
    forceNew: true,
  });