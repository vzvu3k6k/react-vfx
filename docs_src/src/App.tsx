import React, { useState, useCallback } from "react";
import "./App.css";
import * as VFX from "react-vfx";
import Bg from "./Bg";
import Frame from "./dom/Frame";
import debounce from "lodash.debounce";

const blink = `
    precision mediump float;
    uniform vec2 resolution;
    uniform vec2 offset;
    uniform float time;
    uniform sampler2D src;
    void main() {
        vec2 uv = (gl_FragCoord.xy - offset) / resolution;
        gl_FragColor = texture2D(src, uv) * (1. - sin(time * 10.));
    }
`;

const mouse = `
    precision mediump float;
    uniform vec2 offset;
    uniform vec2 mouse;
    uniform float time;
    uniform sampler2D src;

    void main() {
        float l = length(gl_FragCoord.xy - mouse);
        float threshold = 100.;
        float c = smoothstep(threshold + .01, threshold, l);
        gl_FragColor = vec4(c);
    }
`;

const App: React.FC = () => {
    const [text, setText] = useState("You can dynamically!!!!");
    const [debouncedText, setDebouncedText] = useState(
        "You can dynamically!!!!"
    );

    const setDebounced = useCallback(
        debounce((t: string) => setDebouncedText(t)),
        []
    );
    const update = useCallback(
        e => {
            setText(e.target.value);
            setDebounced(text);
        },
        [text]
    );

    return (
        <VFX.VFXProvider pixelRatio={1}>
            <Bg />
            <div className="App">
                <Frame />
                <section className="App-hero">
                    <VFX.VFXImg
                        className={`App-hero-logo`}
                        src="logo-mobile@2x.png"
                        shader={"rgbShift"}
                    />
                </section>
                <section className="Section2">
                    <VFX.VFXP shader="rainbow">
                        REACT-VFX is a React component library. It allows you to
                        use WebGL power to stylize your React application.
                        REACT-VFX is a React component library. It allows you to
                        use WebGL power to stylize your React application.
                        REACT-VFX is a React component library. It allows you to
                        use WebGL power to stylize your React application.
                    </VFX.VFXP>
                </section>
                <section className="Secton3">
                    <h2>
                        <VFX.VFXSpan shader="rainbow">
                            {debouncedText}
                        </VFX.VFXSpan>
                    </h2>
                    <br />
                    <input
                        style={{ fontSize: 36 }}
                        type="text"
                        value={text}
                        onChange={update}
                    ></input>
                </section>
                <section className="Secton3">
                    <h2>Transition Effects!</h2>
                    <VFX.VFXImg shader="warpTransition" src="logo192.png" />
                    <VFX.VFXImg shader="slitScanTransition" src="logo192.png" />
                    <VFX.VFXImg shader="pixelateTransition" src="logo192.png" />
                </section>
                <section className="Section-Gif">
                    <h2>GIF</h2>
                    <img src="mind_blown.gif" alt="mind_blown original" />
                    <img src="octocat.gif" alt="octocat original" />
                    <img src="cat.gif" alt="cat original" />
                    <img src="doge.gif" alt="doge original" />
                    <br />
                    <VFX.VFXImg src="mind_blown.gif" shader="halftone" />
                    <VFX.VFXImg src="octocat.gif" shader="glitch" />
                    <VFX.VFXImg src="cat.gif" shader="rainbow" />
                    <VFX.VFXImg src="doge.gif" shader="pixelate" />
                </section>
                <section className="Section-Video">
                    <h2>VIDEO</h2>
                    <VFX.VFXVideo
                        src="mind_blown_2.mp4"
                        shader="rainbow"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    <video
                        src="mind_blown_2.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </section>
                <section>
                    <h2>Author</h2>
                    <img />
                    <a href="https://twitter.com/amagitakayosi">AMAGI</a>
                </section>
            </div>
        </VFX.VFXProvider>
    );
};

export default App;
