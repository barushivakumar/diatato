import React, { useState, useRef, useEffect } from "react";

import "../Dashboard/dashboard.css"
import alldata from "../Dashboard/sampledata.json"
const Initialform = ({ showfor, onClose }) => {
  const studentdata = alldata.schools[0].teachers[0].students[0]
  // console.log(studentdata)
  const questionsDOctors = [
    {
      question: "How would you rate the student's overall mental well-being?",
      options: ["Excellent", "Good", "Fair", "Poor"],
    },
    {
      question: "Does the student experience high levels of stress or anxiety?",
      options: ["Frequently", "Sometimes", "Rarely", "Never"],
    },
    {
      question: "How would you assess the student's physical health?",
      options: ["Excellent", "Good", "Fair", "Poor"],
    },
    {
      question: "Does the student have a healthy school-life balance?",
      options: [
        "Yes, it is well-balanced",
        "It could use some improvement",
        "It needs significant improvement",
        "I'm not sure",
      ],
    },
    {
      question: "How is the student's overall sleep quality?",
      options: [
        "Excellent, gets enough restful sleep",
        "Good, but could use some improvement",
        "Fair, experiences occasional sleep disturbances",
        "Poor, often struggles with sleep-related issues",
      ],
    },
    {
      question: "How often does the student engage in physical activity or exercise?",
      options: [
        "Daily",
        "Several times a week",
        "Once in a week",
        "Rarely or never",
      ],
    },{
      question: "Does the student have a balanced and nutritious diet?",
      options: [
        "Yes, always",
        "Mostly, but some improvements can be made",
        "Occasionally, they tend to make unhealthy choices",
        "No, their diet needs significant improvement",
      ],
    }
  ];
  const questionsDieticians = [
    {
      question: "How would you rate your overall physical activity level?",
      options: [
        "Sedentary (little to no exercise)",
        "Lightly active (light exercise/sports 1-3 days a week)",
        "Moderately active (moderate exercise/sports 3-5 days a week)",
        "Very active (hard exercise/sports 6-7 days a week)",
        "Extremely active (very hard exercise/sports)",
      ],
    },
    {
      question: "How many meals and snacks do you typically consume in a day?",
      options: [
        "Three meals and two snacks",
        "Three meals and one snack",
        "Two meals and two snacks",
        "Other (please specify)",
      ],
    },
    {
      question: "Do you have any specific dietary restrictions or food allergies?",
      options: ["Yes (please specify)", "No"],
    },
    {
      question: "How would you describe your typical daily fluid intake?",
      options: [
        "Hydrated, drinking plenty of water throughout the day",
        "Adequate, but could drink more water",
        "Insufficient, rarely drink enough water",
        "Mostly consume sugary or high-calorie beverages",
      ],
    },
    {
      question: "How would you rate the variety of fruits and vegetables in your diet?",
      options: [
        "Diverse, regularly include a wide range of fruits and vegetables",
        "Moderate, include some variety but could improve",
        "Limited, stick to a few favorite fruits and vegetables",
        "Rarely consume fruits and vegetables",
      ],
    },
    {
      question: "Are you currently taking any dietary supplements or medications?",
      options: ["Yes (please specify)", "No"],
    },
    {
      question: "How frequently do you eat fast food or processed snacks?",
      options: [
        "Almost never, I prefer home-cooked meals",
        "Occasionally, once or twice a week",
        "Frequently, several times a week",
        "Regularly, almost every day",
      ],
    }
  ];
  const questionsFitness = [
    {
      question: "How often do you engage in cardiovascular exercises per week?",
      options: [
        "5 or more days",
        "3-4 days",
        "1-2 days",
        "Rarely or never"
      ]
    },
    {
      question: "How many hours of active play (e.g., running, jumping, playing sports) do you engage in each day?",
      options: [
        "1 hour or more",
        "30 minutes to 1 hour",
        "Less than 30 minutes",
        "Rarely or never"
      ]
    },
    {
      question: "Do you participate in any organized sports or physical activities outside of school hours?",
      options: [
        "Yes, regularly",
        "Sometimes, on weekends or occasionally",
        "No, I prefer unstructured play"
      ]
    },
    {
      question: "How much time do you spend on sedentary activities like watching TV or using electronic devices each day?",
      options: [
        "Less than 1 hour",
        "1-2 hours",
        "2-3 hours",
        "More than 3 hours"
      ]
    },
    {
      question: "Are you involved in any school sports teams or fitness-related clubs?",
      options: [
        "Yes, I actively participate in school sports/clubs",
        "Sometimes, depending on the sport/activity",
        "No, I am not part of any school sports/clubs"
      ]
    },
    {
      question: "How would you describe your interest in physical activities or sports?",
      options: [
        "Very interested, I love being active",
        "Moderately interested, I enjoy some activities",
        "Not very interested, I prefer other activities",
        "I'm not sure"
      ]
    }
  ];
  const questionspsychologist = [
    {
      question: "How would you rate your overall emotional well-being?",
      options: [
        "Excellent - I feel emotionally stable and content",
        "Good - I experience some ups and downs but generally feel fine",
        "Fair - I struggle with emotions occasionally",
        "Poor - I am experiencing significant emotional distress"
      ]
    },
    {
      question: "How do you feel about going to school each day?",
      options: [
        "Excited and happy",
        "Mostly happy, but sometimes nervous",
        "Indifferent, neither happy nor sad",
        "Anxious or upset"
      ]
    },
    {
      question: "How do you handle conflicts or disagreements with your peers?",
      options: [
        "I talk to them and try to resolve the issue peacefully",
        "I sometimes get upset, but we usually work it out",
        "I avoid conflicts and stay away from the situation",
        "I don't know how to handle conflicts and get very upset"
      ]
    },
    {
      question: "Are you comfortable expressing your feelings to your teachers or parents?",
      options: [
        "Yes, I talk to them about how I feel",
        "Sometimes, but I'm not always open about my feelings",
        "No, I prefer to keep my feelings to myself",
        "I don't know how to express my feelings to others"
      ]
    },
    {
      question: "How do you cope with academic pressure and school-related stress?",
      options: [
        "I manage stress well and have healthy coping strategies",
        "I sometimes get overwhelmed, but I find ways to cope",
        "I often feel stressed and struggle to cope with the pressure",
        "I don't cope well with stress and feel extremely overwhelmed"
      ]
    },
    {
      question: "How often do you feel overwhelmed by schoolwork, exams, or other responsibilities?",
      options: [
        "Rarely or never",
        "Occasionally",
        "Often",
        "Almost all the time"
      ]
    },
    {
      question: "Are you currently experiencing any of the following mental health concerns? (Select all that apply)",
      options: [
        "Anxiety",
        "Depression",
        "Stress",
        "Sleep difficulties",
        "None of the above"
      ]
    }
  ];
  
  
  const [showform, setshowform] = useState(true)
  const [showform1, setshowform1] = useState(true)
  const [showform2, setshowform2] = useState(false)
  const [showform3, setshowform3] = useState(false)
  const [showform4, setshowform4] = useState(false)
  const [showform5, setshowform5] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    address: '',
    class: '',
    height: '',
    weight: '',
    bmi: '',
    enrollmentNumber: '',
    admissionNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [answers, setAnswers] = useState([]);

  const handleSelectChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  function GotoForm2() {
    setshowform1(false)
    setshowform2(true)
  }
  function GotoForm3() {
    setshowform2(false)
    setshowform3(true)
    console.log(answers)
  }
  function GotoForm4() {
    setshowform3(false)
    setshowform4(true)
  }
  function GotoForm5() {
    setshowform4(false)
    setshowform5(true)
  }
  function saveallformdata() {
    setshowform5(false)
    setshowform(false)
    const savedData = {
      studentDetails: studentdata,
      doctorsAssessment: questionsDOctors.map((q, index) => ({
        question: q.question,
        answer: answers[index] || "",
      })),
      dieticiansAssessment: questionsDieticians.map((q, index) => ({
        question: q.question,
        answer: answers[index] || "",
      })),
      fitnessAssessment: questionsFitness.map((q, index) => ({
        question: q.question,
        answer: answers[index] || "",
      })),
      psychologistAssessment: questionspsychologist.map((q, index) => ({
        question: q.question,
        answer: answers[index] || "",
      })),
    };
    console.log(savedData)
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate BMI here if needed
    // Submit the form data to your backend or perform any necessary actions

  };

  return (
    <>


      { showform &&
        <>

          <div className="app d-flex " style={{ position: 'absolute', width: '100%' }}>

            <div className="componentContainer">

              <div className="dialog-container">
                <div className="dialog-box">
                  {showform1 && <>

                    <h2>Initial Details</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="name">Name</label>
                          <input
                          disabled
                            type="text"
                            id="name"
                            name="name"
                            value={studentdata.student_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="age">Age</label>
                          <input
                          disabled
                            type="text"
                            id="age"
                            name="age"
                            value={studentdata.student_age}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="dob">DOB</label>
                          <input
                          disabled
                            type="string"
                            id="dob"
                            name="dob"
                            value={studentdata.DOB
                            }
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="address">Address</label>
                          <input
                          disabled
                            type="text"
                            id="address"
                            name="address"
                            value={studentdata.student_address
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="class">Class</label>
                          <input
                          disabled
                            type="text"
                            id="class"
                            name="class"
                            value={studentdata.student_class
                            }
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="height">Height</label>
                          <input
                          disabled
                            type="text"
                            id="height"
                            name="height"
                            value={studentdata.height}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="weight">Weight</label>
                          <input
                          disabled
                            type="text"
                            id="weight"
                            name="weight"
                            value={studentdata.weight}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="bmi">BMI</label>
                          <input
                          disabled
                            type="text"
                            id="bmi"
                            name="bmi"
                            value={studentdata.BMI}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="enrollmentNumber">Enrollment Number</label>
                          <input
                          disabled
                            type="text"
                            id="enrollmentNumber"
                            name="enrollmentNumber"
                            value={studentdata.Enrollment_Number}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="admissionNumber">Admission Number</label>
                          <input
                          disabled
                            type="text"
                            id="admissionNumber"
                            name="admissionNumber"
                            value={studentdata.Admission_Number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-actions">
                        <button type="submit" onClick={GotoForm2}  style={{ backgroundColor: 'blue', color: 'white' }}>Next</button>

                      </div>
                    </form>
                  </>
                  }
                  {
                    showform2 && <>
                      <h3>General assessment (Doctors)</h3>
                      <form onSubmit={handleSubmit} >
                      {  questionsDOctors.map((q, index) => (
                        <ul>
                          <li><div key={index}>
          <p>{q.question}</p>
          <select
            value={answers[index] || ''}
            onChange={(e) => handleSelectChange(index, e.target.value)}
          >
            <option value="">Select an option</option>
            {q.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div></li>
                        </ul>
        
      ))}
          
          <div className="form-actions">
          <button type="submit" onClick={GotoForm3}  style={{ backgroundColor: 'blue', color: 'white' }}>Next</button>
          </div>
        </form>
                    </>
                  }
                  {
                    showform3 && <>
                      <h3>General assessment (Dieticians)</h3>
                      <form onSubmit={handleSubmit} >
                      {questionsDieticians.map((q, index) => (
                        <ul>
                          <li><div key={index}>
          <p>{q.question}</p>
          <select
            value={answers[index] || ''}
            onChange={(e) => handleSelectChange(index, e.target.value)}
          >
            <option value="">Select an option</option>
            {q.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div></li>
                        </ul>
        
      ))}
          
          <div className="form-actions">
          <button type="submit" onClick={GotoForm4}  style={{ backgroundColor: 'blue', color: 'white' }}>Next</button>
          </div>
        </form>
                    </>
                  }
                  {
                    showform4 && <>
                      <h2>General assessment (fitness coach)</h2>
                      <form onSubmit={handleSubmit}>
                      {questionsFitness.map((q, index) => (
                        <ul>
                          <li><div key={index}>
          <p>{q.question}</p>
          <select
            value={answers[index] || ''}
            onChange={(e) => handleSelectChange(index, e.target.value)}
          >
            <option value="">Select an option</option>
            {q.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div></li>
                        </ul>
        
      ))}
          
          <div className="form-actions">
          <button type="submit" onClick={GotoForm5}  style={{ backgroundColor: 'blue', color: 'white' }}>Next</button>
          </div>
        </form>
                    </>
                  }
                  {
                    showform5 && <>
                      <h2>General assessment (psychologist)</h2>
                      <form onSubmit={handleSubmit} >
                      {questionspsychologist.map((q, index) => (
                        <ul>
                          <li><div key={index}>
          <p>{q.question}</p>
          <select
            value={answers[index] || ''}
            onChange={(e) => handleSelectChange(index, e.target.value)}
          >
            <option value="">Select an option</option>
            {q.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div></li>
                        </ul>
        
      ))}
          
          <div className="form-actions">
          <button type="submit" onClick={saveallformdata} style={{ backgroundColor: 'green', color: 'white' }}>Save</button>
          </div>
        </form>
                    </>
                  }
                </div>
              </div>

            </div>
          </div>

        </>
      }
    </>
  );

}


export default Initialform;