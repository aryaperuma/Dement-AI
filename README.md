##💡Inspiration
According to WHO, currently, more than 55 million people are living with dementia worldwide and there are nearly 10 million new cases every year. It is currently the seventh leading cause of death among all diseases. Being such a chronic disease it would be great if we can detect it early and it may save someone's life. People might underestimate their symptoms of dementia early as they have to visit the clinic for a checkup and also they have to pay for it. So, to remove this inconvenience we have decided to build a platform that asks users some questions, and based on that it will predict whether the person has to visit a clinic or not. 

## ⚙ What it does
DementAI is a web-based platform that helps users to determine whether they are having dementia or not by asking certain questions. Questions are arranged in such a way that we get the required parameters for our machine learning model which helps to predict dementia. Most of the questions are taken from Mini Mental State Examination (MMSE) which plays a major role in determining dementia or cognitive impairment in general. If user is detected with Dementia we recommend that user to visit nearest mental health clinic. We have also developed a game that helps dementia patients to improve their cognitive impairment. 

## 🔧 How we built it
- **Frontend:** HTML, CSS, Javascript and Tailwind CSS.
- **Backend:** Node.js, Python (To Train ML Model)
- **Elemeno:** We have hosted our ML model on elemeno.ai which provides MLOps as a service. Elemeno has given us an API endpoint using which we can send input features to our model and it will return us the predicted output.
- **AssemblyAI:** We have used AssemblyAI to convert Speech to Text. For certain cases, we need to ask the user to read a sentence so for those cases we have used AssemblyAI. 
- **Auth0:** For user authentication to our website we have used Auth0.
- **Circle CI:** For seamless experience while pushing our code to production we have built a CI/CD pipeline using Circle CI. 

## 💪 Challenges we ran into
- It was a critical task to get a good accuracy for our machine learning model but at last, we are able to achieve 89% of accuracy on our test dataset. 
- In starting it was difficult to use AssemblyAI for real-time Speech-to-text conversion but later on we have figured it out by seeing a sample code on github. 
- Another challenge for us was to use Elemeno to deploy our machine learning as use it as Rest API and the Elemeno team helped us a lot by solving our queries.
- It took some time for us to learn how to build CI/CD pipeline using Circle Ci as it was the first time we have used it. 

## 🙌 Accomplishments that we're proud of
- We were successfully able to implement all the features that we have thought of before the hackathon. 
- We were finally able to use sponsor tools like Elemeno, AssemblyAI, Auth0, and Circle Ci. 

## 📚 What we learned
- We have learned how to convert Speech to Text in real-time using AssemblyAI.
- Learned how to deploy our machine learning model using Elemeno and use it as Rest API. 
- Learned how to build CI/CD pipelines and use Github Actions.
-  We have learned about the MMSE test which helps to identify cognitive impairment. 

## 💭 What's next for DementAI
- We can improve the user interface as well as user experience and also build a mobile application with the same functionalities.
- Build a more robust machine learning model.
- Add more games to help dementia patients.
