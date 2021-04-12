import React, {useEffect, useState} from 'react';

import {
  SurveyTextInput,
  SurveyRadioInput,
  SurveySelectInput
} from './index';

import { verifyTextInputType } from './validators';

export const Survey = (props) => {
  const [page, setPage] = useState(1)
  const [isFinalPage, setIsFinalPage] = useState(false)
  const [surveyValues, setSurveyValues] = useState({})
  const [loadedInputs, setLoadedInputs] = useState([])

  const {surveyId} = props

  useEffect(()=>{
    if (surveyId){
      // check if its a file going forward we would use api request
      const inputDataFile = import(`../data/survey_${surveyId}.json`)
      // http request
      inputDataFile.then(response=>{
        // set the new inputs list data
        setLoadedInputs(response.default)
      })
    }
  })

  const triggerBackendUpdate = () => {
    console.log('your done',surveyValues)
    alert("Thank you!")
    // assume backend updated
    setPage(1)
    setSurveyValues({})
    setIsFinalPage(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.persist()
    for (let formInput of event.target.elements){
      const verifyType = verifyTextInputType(formInput.type)
      if (verifyType) {
        surveyValues[formInput.name] = formInput.value
      }

      if (formInput.type === 'select-one') {
        console.log(formInput.name, formInput.value)
        surveyValues[formInput.name] = formInput.value
      }

      if (formInput.type === 'select-multiple') {
        const selected = [].filter.call(formInput.options, option=>option.selected)
        const values = selected.map(option => option.value)
        surveyValues[formInput.name] = values
      }
      if (formInput.checked) {
        // console.log(formInput.name, formInput.value)
        surveyValues[formInput.name] = formInput.value
      }
      setSurveyValues(surveyValues)
      const nextPage = page + 1
      const inputs = loadedInputs ? loadedInputs.filter(inputOption => inputOption.page === nextPage) : []

      if (isFinalPage) {
        triggerBackendUpdate()
      } else { 
        if (inputs.length === 0) {
          setIsFinalPage(true)
        } else {
          setPage(nextPage)
        }
      }
    }
  }


  const inputs = loadedInputs ? loadedInputs.filter(inputOption => inputOption.page === page) : []
  return <form onSubmit={handleSubmit}>
    {isFinalPage !== true && inputs.map((obj, index)=> {
    //animation
    const className = 'form-control mb-2 animate__animated animate__fadeIn'

    const inputKey = `input-${index}-${page}`
    return (obj.type === 'radio' || obj.type === 'checkbox' ) ?
      <SurveyRadioInput 
        object={obj}  
        key={inputKey}
        className={className}
        {...obj}
      />

      :

      (obj.type === 'select') ?
      
      <SurveySelectInput 
        className={className}
        object={obj}  
        key={inputKey}
        {...obj}
      />
      :
      
      <SurveyTextInput
      className={className}
      key={inputKey}
      {...obj}
      />
    })
  }

  {isFinalPage === true &&
    <p>Are you finished?</p>
  }

  <button
  name='save_btn'
  type='submit' 
  className='btn btn-primary my-5 animate__animated animate__fadeIn animate__delay-2s'>{isFinalPage === true ? "Save" : "Contine"}</button>
  </form>
}