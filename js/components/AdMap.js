import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const AdMap = withScriptjs(withGoogleMap((props) =>{
	let events = props.events, tooltipIndex = 0, tooltipBlock = '';
	let markerTemplates = [];
	/* for (let e, i = 0, size = events.length - 1; i < size; ++i) {
		e = events[i];
		let date = new Date(new Date(e.time).getTime() + 1000 * 60 * 60 * 3);
		tooltipBlock += '\n' + date.toJSON() + '\n' + e.event + '\n';
		if (events[i + 1].loc[0] === e.loc[0] && events[i + 1].loc[1] === e.loc[1])		continue;
		
		markerTemplates.push({
			loc: e.loc,
			label: tooltipIndex.toString(),
			title: tooltipBlock
		});
		++tooltipIndex;
		tooltipBlock = '';
    } */
	
  const markers = markerTemplates.map(template => (
		<Marker
			position={{
				lat: template.loc[0],
				lng: template.loc[1]
			}}
			label={template.label}
			title={template.title}
		/>
	));

  return (
      <GoogleMap
        defaultZoom={12}
        center={{
					lat: 41.03583352661133,
					lng: 29.03219512939453
				}}
      >
        {markers}
      </GoogleMap>
    );
  }
))

export default AdMap;

