import React, {useState} from 'react'

export default function HardwareSoftwareReq(props) {
	//console.log("props en HardwareSoftwareReq", props);
	const [data, setData]=useState(props);

  return (
      <div>
			<h3 id='tech' tabIndex="0">Technological Requirements</h3>
			<div tabIndex="0" className='descriptiontext'>
				As a online course, it's required that you have access to a computer 'desktop or mobile' with internet connection.
			</div>
			<div  className='crnheading'>
				<h4 tabIndex="0" id="tech-hard">Hardware requirements</h4>
			</div>
			
			{
				data.length!=0 ?
				<div>
					
						<ol className='resources'>
							{
								data.data[1]!=undefined?
								data.data[1].map((item, index) =>(
									<li tabIndex="0" key={index}>{item.label}</li>
								))
								:
								<li tabIndex="0" className='descriptiontext'>
									No hardware requirement.
								</li>
							}
						</ol>
				
				</div>
				:
				undefined
			}
			<div className='crnheading'>
				<h4 tabIndex="0" id="tech-soft">Software requirements</h4 >
			</div>
			
			{
				data.length!=0 ?
				<ol className='resources'>
					{	
						data.data[0]!=undefined?
						data.data[0].map((item, index) =>(
								<li tabIndex="0" key={index}>{item.label}</li>
							)) 
						:
						<li tabIndex="0">
							No software requirement.
						</li>  
					}
				</ol>
				:
				undefined
			} 
      </div>
   )
}
