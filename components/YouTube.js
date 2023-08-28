import React from "react";
import Embed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YouTube = ({ id, title }) => <Embed id={id} title={title} />;

export default YouTube;
