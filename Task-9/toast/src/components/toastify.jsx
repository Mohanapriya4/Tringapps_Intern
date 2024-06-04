import React from "react";
import './style.css';

function Tst() {
    const showToast = (msg) => {
        let toast = document.createElement('div'); // Create toast div
        toast.classList.add('toast'); // Add toast class
        toast.innerHTML = `
            <span>${msg}</span> 
            <button class="close-btn">×</button> 
        `;
        let toastBox = document.getElementById('toastBox'); 
        toastBox.appendChild(toast); 
      
        toast.querySelector('.close-btn').addEventListener('click', () => {
            toast.classList.add('hide'); 
        });
    }

    return (
        <>
            <div className="buttons">
                <button onClick={() => showToast('Successfully done')}>
                    Success
                </button>
            </div>
            <div id="toastBox"></div>
        </>
    );
}

export default Tst;
