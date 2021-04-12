
export const myInputs = [
    {
        page: 1,
        name: 'full_name',
        required:true,
        type: 'text',
        placeholder: 'Your full Name'
    },
    {
        page: 2,
        name: 'email',
        type: 'email',
        required:true,
        placeholder: 'hello@abc.com'
    },
    {
        page: 3,
        name: 'message',
        type: 'textarea',
        
        placeholder: 'Welcome!'
    },
    {
        page: 4,
        name: 'mySingleChoice',
        type: 'checkbox',
        options: [
            {
                value: 1,
                label: 'Label 1'
            }, 
            {
                value: 'abc',
                label: 'Label abc'
            },
            {
                value: '123',
                label: 'Label 123'
            }
        ]
    },
    {
        page: 5,
        name: 'myDropdownSelected',
        type: 'select',
        options: [
        {
            value: 1,
            label: 'Label 1'
        }, 
        {
            value: 'abc',
            label: 'Label abc'
        },
        {
            value: '123',
            label: 'Label 123'
        }
    ]
    },
    {
        page: 6,
        name: 'myMultiSelect',
        type: 'select',
        multiple: true,
        options: [
            {
                value: 1,
                label: 'Label 1'
            }, 
            {
                value: 'abc',
                label: 'Label abc'
            },
            {
                value: '123',
                label: 'Label 123'
            }
        ]
        },
  ]


//   // XMLHttpRequest() // async
//   let formData = new FormData()
//   for (let formInput of event.target.elements){
//     if (formInput.name !== 'save_btn') {
//       //console.log(formInput.name, formInput.value)
//       formData.append(formInput.name, formInput.value)
//     }
//   }