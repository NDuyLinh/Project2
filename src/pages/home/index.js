
// import React, {useEffect} from "react";
// import { useDispatch } from "react-redux";
// import { Col, Row } from 'react-bootstrap';
// import { CircleChartWidget, TeamMembersWidget, ProgressTrackWidget } from "../../components/Widgets";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { PageVisitsTable } from "../../components/Tables";
// import { trafficShares } from "../../data/charts";
// import BadmintonCalendar from "../../components/Calendar";
// import memberActions from "../../services/memberActions";
// import { setMembers } from "../../reducer/slices/MembersSlice"

// const HomePage = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     getAllMembers();
    
//   }, []);

//   const getAllMembers = async () => {
//     const response = await memberActions.getAllMember();
//     if(response && response.length > 0) {
//       dispatch(setMembers(response));
//     }
//   }
  
//   return (
//     <React.Fragment>
//       <Row>
//         <Col xs={12} xl={12} className="mb-4">
//           <Row>
//             <Col xs={12} xl={8} className="mb-4">
//               <Row>
//                 <Col xs={12} className="mb-4">
//                   <PageVisitsTable />
//                 </Col>
//                 <Col xs={12} lg={6} className="mb-4">
//                   <TeamMembersWidget />
//                 </Col>
//                 <Col xs={12} lg={6} className="mb-4">
//                   <ProgressTrackWidget />
//                 </Col>
//               </Row>
//             </Col>

//             <Col xs={12} xl={4}>
//               <Row>
//                 <Col xs={12} className="mb-4">
//                   <CircleChartWidget
//                     title="Biểu đồ"
//                     data={trafficShares} />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={12} className="px0">
//                   <BadmintonCalendar/>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//       <footer className="footer">
//         <div className="footer-info">Powered by Thieu Le <FontAwesomeIcon icon={faHeart} color="#FA5252"/> !</div>
//       </footer>
//     </React.Fragment>
//   );
// };

// export default HomePage;