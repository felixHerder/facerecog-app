import React from 'react'

const Footer = () => {

  return (
    <footer className="w-100 flex  items-center  tl bg-white-10 near-black f7 relative bottom-0 left-0">
      <p className="dib mb0 ml3 pt2 pb2">Built with React and Express with  PostgreSQL on Heroku.</p>
      <div className="flex items-center ml-auto mb0 mr3">
        <p className="mr3 mb0">Powered by <a href="https://www.clarifai.com/">Clarifai</a></p>
        <a className="w1 dib mh2" href="https://github.com/felixHerder/facerecog-app" title="github link">
          <svg className="dib" data-icon="github" viewBox="0 0 32 32">
            <title>github icon</title>
            <path d="M0 18 C0 12 3 10 3 9 C2.5 7 2.5 4 3 3 C6 3 9 5 10 6 C12 5 14 5 16 5 C18 5 20 5 22 6 C23 5 26 3 29 3 C29.5 4 29.5 7 29 9 C29 10 32 12 32 18 C32 25 30 30 16 30 C2 30 0 25 0 18 M3 20 C3 24 4 28 16 28 C28 28 29 24 29 20 C29 16 28 14 16 14 C4 14 3 16 3 20 M8 21 A1.5 2.5 0 0 0 13 21 A1.5 2.5 0 0 0 8 21 M24 21 A1.5 2.5 0 0 0 19 21 A1.5 2.5 0 0 0 24 21 z"></path>
          </svg>
        </a>
        <a className="w1 dib mh2" href="http://felixherder.space" title="website link">
          <svg data-icon="dribbble" viewBox="0 0 32 32" >
            <title>dribbble icon</title>
            <path d="M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M5 11.5 A12 12 0 0 1 11 5 A46 46 0 0 1 13.5 9.25 A46 46 0 0 1 5 11.5 M15 4 A12 12 0 0 1 21.5 5.25 A46 46 0 0 1 17 7.75 A50 50 0 0 0 15 4 M4 16 A50 50 0 0 0 15 13 A46 46 0 0 1 16 15.5 A26 26 0 0 0 6 22.5 A12 12 0 0 1 4 16 M18.5 11.5 A50 50 0 0 0 25 8 A12 12 0 0 1 28 13.75 A26 26 0 0 0 19.75 14.5 A50 50 0 0 0 18.5 11.5 M17 19.5 A46 46 0 0 1 18 28 A12 12 0 0 1 8.75 25.5 A22 22 0 0 1 17 19.5 M20.75 18.25 A22 22 0 0 1 28 17.75 A12 12 0 0 1 22 26.5 A50 50 0 0 0 20.75 18.25"></path>
          </svg>
        </a>
      </div>
    </footer >
  );
}

export default Footer;






