// // // import React from "react";
// import team1 from './../../assest/images/team1.jpg'
// import team2 from './../../assest/images/team2.jpg'
// import team3 from './../../assest/images/team3.jpg'
// import team4 from './../../assest/images/team4.jpg'
// function HomepageTeam(){
//     return(
//         <section className="team_section layout_padding">
//     <div className="container-fluid">
//       <div className="heading_container heading_center">
//         <h2 className="">
//           Our <span> Team</span>
//         </h2>
//       </div>

//       <div className="team_container">
//         <div className="row">
//           <div className="col-lg-3 col-sm-6">
//             <div className="box ">
//               <div className="img-box">
//                 <img src={team1} className="img1" alt="" />
//               </div>
//               <div className="detail-box">
//                 <h5>
//                   Joseph Brown
//                 </h5>
//                 <p>
//                   Marketing Head
//                 </p>
//               </div>
//               <div className="social_box">
//                 <a href="#">
//                   <i className="fa fa-facebook" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-twitter" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-linkedin" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-instagram" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-youtube-play" aria-hidden="true"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-sm-6">
//             <div className="box ">
//               <div className="img-box">
//                 <img src={team2} className="img1" alt="" />
//               </div>
//               <div className="detail-box">
//                 <h5>
//                   Nancy White
//                 </h5>
//                 <p>
//                   Marketing Head
//                 </p>
//               </div>
//               <div className="social_box">
//                 <a href="#">
//                   <i className="fa fa-facebook" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-twitter" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-linkedin" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-instagram" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-youtube-play" aria-hidden="true"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-sm-6">
//             <div className="box ">
//               <div className="img-box">
//                 <img src={team3} className="img1" alt="" />
//               </div>
//               <div className="detail-box">
//                 <h5>
//                   Earl Martinez
//                 </h5>
//                 <p>
//                   Marketing Head
//                 </p>
//               </div>
//               <div className="social_box">
//                 <a href="#">
//                   <i className="fa fa-facebook" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-twitter" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-linkedin" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-instagram" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-youtube-play" aria-hidden="true"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-sm-6">
//             <div className="box ">
//               <div className="img-box">
//                 <img src={team4} className="img1" alt="" />
//               </div>
//               <div className="detail-box">
//                 <h5>
//                   Josephine Allard
//                 </h5>
//                 <p>
//                   Marketing Head
//                 </p>
//               </div>
//               <div className="social_box">
//                 <a href="#">
//                   <i className="fa fa-facebook" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-twitter" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-linkedin" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-instagram" aria-hidden="true"></i>
//                 </a>
//                 <a href="#">
//                   <i className="fa fa-youtube-play" aria-hidden="true"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//     )
// }

// export default HomepageTeam;



// Import React and team images
import React from 'react';
import team1 from './../../assest/images/team1.jpg'
import team2 from './../../assest/images/team2.jpg'
import team3 from './../../assest/images/team3.jpg'
import team4 from './../../assest/images/team4.jpg'
import './flip.scss'; // Make sure to create this SCSS file

function HomepageTeam() {
  const teamMembers = [
    { id: 1, name: 'Joseph Brown', position: 'Marketing Head', image: team1, socials: ['#', '#', '#', '#'] },
    { id: 2, name: 'Nancy White', position: 'Marketing Head', image: team2, socials: ['#', '#', '#', '#'] },
    { id: 3, name: 'Earl Martinez', position: 'Marketing Head', image: team3, socials: ['#', '#', '#', '#'] },
    { id: 4, name: 'Josephine Allard', position: 'Marketing Head', image: team4, socials: ['#', '#', '#', '#'] },
  ];

  return (
    <section className="team_section layout_padding">
      <div className="container-fluid">
        <div className="heading_container heading_center" >
          <h2 >Our <span>Team</span></h2>
        </div>
        <div className="team_container">
          <div className="row">
            {teamMembers.map(member => (
              <div className="col-lg-3 col-sm-6" key={member.id}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="flip-card-back">
                      <h5>{member.name}</h5>
                      <p>{member.position}</p>
                      <div className="social_box">
                        {member.socials.map((link, index) => (
                          <a href={link} key={index}>
                            <i className={`fa ${['fa-facebook', 'fa-twitter', 'fa-linkedin', 'fa-instagram'][index]}`} aria-hidden="true"></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageTeam;



