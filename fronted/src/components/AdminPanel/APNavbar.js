// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from 'react-apollo';

// import styles from './navbar.module.css';
// import { getUserQuery } from '../../queries/user-queries';

// interface navbarProps {
//   currentPage: string;
// }

// interface userData {
//   user: {
//     username: string;
//     email: string;
//     admin: string;
//     cart: string;
//   };
// }

// interface userVariables {
//   accessToken: string;
// }

// const Navbar = (props: navbarProps) => {
//   let token: any = '';
//   if (localStorage.getItem('accessToken')) {
//     token = localStorage.getItem('accessToken');
//   }

//   const { data } = useQuery<userData, userVariables>(getUserQuery, {
//     variables: {
//       accessToken: token,
//     },
//   });
//   return (
//     <div>
//       <ul className={styles.container}>
//         <li className={props.currentPage === 'home' ? styles.current : undefined}>
//           <Link to="/">Home</Link>
//         </li>
//         {data && data.user.admin ? (
//           <li className={props.currentPage === 'dashboard' ? styles.current : undefined}>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         ) : null}

//         <li className={props.currentPage === 'contact' ? styles.current : undefined}>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
