
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave, faBottleWater, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from 'react-bootstrap';
import { CircleChart } from "./Charts";
import { teamMembers } from "../data/teamMembers";
import { PARTICIPATION_STATUS } from '../common/Foundation';

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, phoneNumber, image, icon, nickname } = props;

    return (
      <ListGroup.Item className="px-0 member-item">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar xl-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-success`}>● </span>
            <small>{nickname}</small>
          </Col>
          <Col className="col-auto phone-number-info">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {phoneNumber}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Thành viên</h5>
        <Button variant="secondary" size="sm">See all</Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {teamMembers.map(tm => <TeamMember key={`team-member-${tm.id}`} {...tm} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};


export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false, money} = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{money} VND</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Bảng giá</h5>
      </Card.Header>
      <Card.Body>

        <Progress title="Sân - 1 giờ" color="indigo" icon={faMoneyBill1Wave} percentage={80} money="80.000"/>
        <Progress title="Nước suối - 1 chai" color="secondary" icon={faBottleWater} percentage={8} money="8.000"/>
        <Progress title="Nước ngọt - 1 chai" color="tertiary" icon={faBottleWater} percentage={14} money="14.000"/>
        <Progress title="Xe - 1 chiếc" color="info" icon={faMotorcycle} percentage={2} money="2.000"/>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const {members} = useSelector(slice => slice.membersSlice);
  const { title, data = [] } = props;
  const series = getJoinBadminton(members);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map(d => (
              <h6 key={`circle-element-${d.id}`} className="fw-normal text-gray">
                <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
                {` ${d.label} `}{`${series[d.status]}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const getJoinBadminton = (members) => {
  const defaultData = [0, 0, 0, 0];
  if (members.length === 0) {
    return defaultData;
  }
  const dataJoin = members.reduce((data, item) => {
    switch (item.status_id) {
      case PARTICIPATION_STATUS.NO_VOTE: {
        data[0] += 1;
        break;
      }
      case PARTICIPATION_STATUS.JOIN: {
        data[1] += 1;
        break;
      }
      case PARTICIPATION_STATUS.NO_JOIN: {
        data[2] += 1;
        break;
      }
      case PARTICIPATION_STATUS.RESERVE: {
        data[3] += 1;
        break;
      }
      default: {
        break;
      }
    }
    return data;
  }, defaultData);
  const result = dataJoin.map((data) => {
    return Math.round((100 * parseInt(data)) / members.length);
  });
  return result;
};