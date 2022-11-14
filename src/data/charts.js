
import { faUserCheck, faUserSlash, faUserClock, faBaby } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Chưa vote", color: "yellow", icon: faUserClock, status: 0 },
    { id: 2, label: "Tham gia", color: "join", icon: faUserCheck, status: 1 },
    { id: 3, label: "Không Tham gia", color: "no-join", icon: faUserSlash, status: 2 },
    { id: 4, label: "Dự bị", color: "reserve", icon: faBaby, status: 3 }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};