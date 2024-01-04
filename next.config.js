

module.exports = {
    images: { unoptimized: true,
      domains: [
        "lh3.googleusercontent.com",
        "res.cloudinary.com",
      ]
    },
    modularizeImports: {
      'react-icons/?(((\\w*)?/?)*)': {
          transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
  },
    
   
    
  };
  