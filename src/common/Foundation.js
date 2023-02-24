import { faBaby, faUserCheck, faUserSlash } from "@fortawesome/free-solid-svg-icons";

export const PARTICIPATION_STATUS = {
  NO_VOTE: 0,
  JOIN: 1,
  NO_JOIN: 2,
  RESERVE: 3
};

export const STATUS_VOTE = [
  {
    statusId: 1,
    status: 'Tham gia',
    className: 'text-join',
    icon: faUserCheck
  },
  {
    statusId: 2,
    status: 'Không tham gia',
    className: 'text-no-join',
    icon: faUserSlash
  },
  {
    statusId: 3,
    status: 'Dự bị',
    className: 'text-reserve',
    icon: faBaby
  }
]

export const ADMIN = "admin";