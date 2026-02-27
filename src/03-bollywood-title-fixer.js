/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  let fillers = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"], ans = [], flag = false;
  if(typeof title === 'string' && title.trim().length > 0){
    title = title.trim().split(/\s+/).map((t) => t.toLowerCase());
    for(let i=0;i<title.length;i++){
      flag = false;
      for(let j=0;j<fillers.length;j++){
        if(title[i] === fillers[j] && i !== 0){
          ans.push(title[i]);
          flag = true;
        } 
      }
      if(!flag){
        ans.push(title[i].charAt(0).toUpperCase() + title[i].slice(1));
      }
    }
    return ans.join(" ")
  }
  return "";
}
