export const truncate = (followers) => {
    let convertedString = followers.toString();
    let followerCount = "";
    if(followers > 999 && followers < 10000){
      const leftOfComma = convertedString.substring(0, 1);
      const rightOfComma = convertedString.substring(1, 4);
      followerCount = leftOfComma + ',' + rightOfComma;
      return followerCount;
    }
    
    if (followers > 9999 && followers < 100000) {
      if ((followers % 1000 >= 1 && followers % 1000 <= 99)) {
        followerCount = convertedString.substring(0, 2) + "K";
        return followerCount;
      }
      const leftOfDecimal = convertedString.substring(0, 2);
      const rightOfDecimal = convertedString.substring(2, 3);
      followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
      return followerCount;
    }
  
    if (followers > 99999 && followers < 1000000) {
      if ((followers % 1000 >= 0 && followers % 1000 <= 99)) {
        followerCount = convertedString.substring(0, 3) + "K";
        return followerCount;
      }
      const leftOfDecimal = convertedString.substring(0, 3);
      const rightOfDecimal = convertedString.substring(3, 4);
      followerCount = leftOfDecimal + "." + rightOfDecimal + "K";
      return followerCount;
    }
    return convertedString;
  };