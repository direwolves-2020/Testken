import React from 'react';

export const Operator = (props) => {
    return (
    <select onChange= {props.operation}> 
        <option value = "Addition">Addition</option>
        <option value = "Subtraction">Subtraction</option>
    </select>
    )
};



export const Button = (props) => {
	// console.log(props.style);
	return(
	<button 
		style= {props.style} 
		// className = {props.type==='primary'? 'btn btn-primary' : 'btn btn-secondary'}
		onClick= {props.action} > 
		{props.title} 
	</button>)
}


export const Input = (props) => {
	//console.log(props.value);
	return (  
  <div className="form-group">
    <label for={props.name} className="form-label">{props.title}</label>
    <input
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    //   {...props}
       />
  </div>
)
}

export const Select = (props) => {
	return(<div className="form-group">
			<label for={props.name}> {props.title} </label>
		    <select
		      id = {props.name}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
		      className="form-control">
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option}
		            value={option}
		            label={option}>{option}</option>
		        );
		      })}
		    </select>
  </div>)
}

// export const CheckBox = (props) => {

//     return( <div>
//     <label for={props.name} className="form-label">{props.title}</label>
//     <div>
//       {props.options.map(option => {
//         return (
//           <label key={option}>
//             <input
//               className="form-checkbox"
//               id = {props.name}
//               name={props.name}
//               onChange={props.handleChange}
//               value={option}
//               checked={ props.selectedOptions.indexOf(option) > -1 }
//               type="checkbox" /> {option}
//           </label>
//         );
//       })}
//     </div>
//   </div>
// );

// }
