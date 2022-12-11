
import React, {useEffect} from "react";
import { Col, Row } from 'react-bootstrap';
import { CircleChartWidget, TeamMembersWidget, ProgressTrackWidget } from "../../components/Widgets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares } from "../../data/charts";
import BadmintonCalendar from "../../components/Calendar";
import memberActions from "../../services/memberActions";


const HomePage = () => {

  useEffect(() => {
    getAllProducts();
    
  }, []);

  const getAllProducts = async () => {
    const response = await memberActions.getProducts();
    if(response && response.length > 0) {
    }
  }
  
  return (
    <React.Fragment>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable/>
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="px0">
                  <BadmintonCalendar/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HomePage;