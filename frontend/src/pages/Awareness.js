import React from 'react';
import './Aware.css';
// Dummy data for demo
const articles = [
  {
    "Title": `Taught Me One Powerful Lesson": Anand Mahindra Recalls Daughter's Injury`,
    "Description": ` Mahindra often shares fascinating and inspirational stories that pique the interest of his followers on social media. This time, while addressing the 4th Atal Bihari Vajpayee Memorial Lecture, the Mahindra Group chairman shared a personal anecdote involving his youngest daughter's accident to underline that solutions to problems often lie in "your own backyard". His inspiring speech was shared by RPG Group chairperson Harsh Goenka on X (formerly Twitter). Mr Goenka wrote in the caption. In his address, Mr Mahindra recounted the distressing time when his daughter suffered a hand injury that required microsurgery. He said that even though he sought care from famous surgeons in Paris and London, the successful operation was eventually performed by Dr Joshi, a surgeon from Mumbai."I have told and retold this story because it taught me one powerful lesson: always look for solutions in your backyard before you think that the best solution lies overseas," the Mahindra Group chairman said. "And how did this affect me and my career? Well, I'm certain there after that, when it came to making big decisions and big bets in business that were based on homegrown technology, I never again lacked the courage to do so," he added. `,
    "Images":"https://c.ndtvimg.com/2023-06/9m9456ho_anand-mahindra-_625x300_05_June_23.jpg",
    "Link": "Dummy link 1"
  },
  {
    "Title":  `Raipur police put up billboards with pictures of 'good samaritans' who help accident victims`,

    "Description":`RAIPUR: The Raipur police in Chhattisgarh have launched a novel initiative to put up billboards with pictures of persons who help road accident victims and reward them for their good work. Under the initiative, aimed at motivating people to help accident victims, one such billboard has been put up in front of the Raipur collectorate having pictures of six 'good samaritans' with descriptions of the incidents in which they provided assistance.
    The billboard carries the message: 'Bheed ka hissa na bane, ghaylon ki madad kar nek insaan bane' (don't become part of the crowd, help the injured and become a good human being).
    Raipur Senior Superintendent of Police Santosh Singh, who came up this idea, told PTI on Wednesday that there is a misconception among people that it is risky to help accident victims and they will be entangled in legal proceedings.
    Around 1.5 lakh persons die every year in road accidents in the country and the main reason is lack of prompt medical treatment to the injured persons, he said.
    The first 30-minute duration after a road accident is considered the 'golden hour as if the injured person gets medical treatment during this period, then his/her life can be saved, the official said.
    In most of the road accidents nowadays, it has been seen people make videos and click photos from their mobile phones but avoid helping the victims, he said.
    The initiative has been launched to clear the misconception and motivate people to help accident victims, the official said.`,
    "Images" :"https://static.toiimg.com/thumb/msid-108643911,imgsize-566423,width-400,height-225,resizemode-72/108643911.jpg",
    "Link": "Dummy link 1"
  },
  {
    "Title": `"You Don't Get An Extra Life": Delhi Police Marks Leap Year With Unique Message`,
    "Description":`In an effort to better connect with the public, Delhi Police took advantage of the rare date of February 29th in a leap year to deliver a special message about traffic safety to drivers. Through their account on X, formerly known as Twitter, the police shared a unique public service announcement that highlighted the specific risks associated with driving under the influence of alcohol. 
    The Delhi Police posted a graphic with a message superimposed on an image of a road. The message stated, "If you think tomorrow is February 30th, then please do not drive. You could be drunk." This is not the first time the department has done something so unique to promote road safety. The Delhi Police has a well-deserved reputation for crafting engaging and impactful messages when it comes to promoting road safety. They consistently utilize innovative techniques, 
    often incorporating humor and popular culture, to grab the attention of the public 
    and effectively communicate important safety guidelines. A  few days back, during the ongoing India vs England Test Series, Indian captain Rohit Sharma warned Sarfaraz Khan to wear a helmet before fielding. The incident took place when he was requested by Rohit to stand beside batsman Shoaib Bashir. However, the young player forgot to put on a helmet. At that moment, the captain urged Sarfaraz to 
    put on the gear and also stopped Ravichandran Ashwin from delivering the ball.`,
    "Images":"https://c.ndtvimg.com/2024-02/4nmvoh8_road-safety_625x300_29_February_24.jpeg",
  },
];

function Awareness() {
  return (
    <div className="container">
      <h2>Awareness Portal</h2>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <div className="article-content">
              <div className="title"><h3>{article.Title}</h3></div>
              <div className="description">{article.Description}</div>
            </div>
            <span className="image">
              <img src={article.Images} alt={article.Title} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Awareness;
