// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from 'react-apollo';

// import styles from './header.module.css';
// import Cart from '../../images/cart.jpg';
// import { getUserQuery } from '../../queries/user-queries';

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

// const Header = () => {
//   let token: any = '';
//   if (localStorage.getItem('accessToken')) {
//     token = localStorage.getItem('accessToken');
//   }

//   const { data } = useQuery<userData, userVariables>(getUserQuery, {
//     variables: {
//       accessToken: token,
//     },
//   });

//   const logOut = () => {
//     localStorage.removeItem('accessToken');
//     window.location.replace('/');
//   };

//   return (
//     <header className={`${styles.header} bg-primary shadowed`}>
//       <div className={styles.logo}>
//         <h1>
//           <Link to="/">RL Item Shop</Link>
//         </h1>
//       </div>
//       {localStorage.getItem('accessToken') ? (
//         <div className={styles.buttons}>
//           <img
//             src={Cart}
//             alt=""
//             onClick={() => {
//               window.location.replace('/#/cart');
//               window.location.reload();
//             }}
//           />
//           <div>
//             <b>{data?.user.email}</b>
//           </div>
//           <button className={`btn`} onClick={() => logOut()}>
//             Sign Out
//           </button>
//         </div>
//       ) : (
//         <div className={styles.buttons}>
//           <img
//             src={Cart}
//             alt=""
//             onClick={() => {
//               window.location.replace('/#/cart');
//               window.location.reload();
//             }}
//           />
//           <Link className={`btn`} to="/signUp">
//             Sign Up
//           </Link>
//           <Link className={`btn`} to="/login">
//             Log In
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
