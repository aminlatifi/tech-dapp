import React from "react";
// import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

const TCmodal = styled.div``;
const ModalCard = styled.div`
  border: 2px solid #04d477;
  border-radius: 1rem;
`;
const ModalTitle = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
  color: #04d477;
`;
const ModalBody = styled.section`
  color: #182129;
  ::-webkit-scrollbar {
    width: 12px; /* for vertical scrollbars */
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Comp = ({ agreed, onSetAgreed }) => {
  const [agreetandc, setAgreetandc] = React.useState(false);
  const [box2, setBox2] = React.useState(false);
  const [box3, setBox3] = React.useState(false);
  const [enableSubmit, setEnableSubmit] = React.useState(false);

  React.useEffect(() => {
    console.log("Check all ??");
    setEnableSubmit(agreetandc && box2 && box3);
  }, [agreetandc, box2, box3]);

  return (
    <>
      <TCmodal className={`modal ${agreed ? "" : "is-active"}`}>
        <div className="modal-background" />
        <ModalCard className="modal-card">
          <header className="modal-card-head">
            <ModalTitle>Terms And Conditions</ModalTitle>
            {/* <button className="delete" aria-label="close"></button> */}
          </header>
          <ModalBody className="modal-card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
              metus sollicitudin, bibendum quam sit amet, ornare ipsum. Maecenas
              cursus orci tortor. Aliquam cursus orci eu ipsum tempor, at
              tristique neque fringilla. Nam vitae ipsum lectus. Etiam tempor
              feugiat venenatis. Ut ipsum nisl, volutpat id ipsum ac, eleifend
              viverra felis. Integer finibus massa vitae congue lobortis. Nam in
              lacus non est iaculis faucibus ut efficitur metus. Aliquam sit
              amet justo sed elit gravida tristique. Cras laoreet nisi et nisi
              tristique, et dapibus mi aliquet. Donec quis diam velit. Sed
              ultrices, nulla in mollis dignissim, nisl lacus rhoncus tortor, id
              finibus lacus libero ut odio. Integer est nisl, commodo sit amet
              lorem vehicula, suscipit eleifend arcu.
            </p>
            <p>
              Duis consequat nisl erat, at faucibus quam tempus eu. Sed
              fringilla, erat ac hendrerit faucibus, massa enim suscipit tortor,
              quis porta risus est vel magna. Aenean suscipit sagittis diam,
              quis imperdiet ante sodales ac. Fusce mattis nisi id ipsum
              posuere, a tincidunt est dapibus. Donec at pellentesque arcu, in
              eleifend ante. Sed semper varius velit, eget tincidunt eros
              fringilla et. Duis consectetur risus dictum, fermentum mauris a,
              tincidunt nisl. Mauris eu massa nisl. Cras lacus nulla,
              condimentum sed posuere vel, posuere sed erat.
            </p>
            <p>
              Aliquam blandit, felis a pulvinar condimentum, felis nisl feugiat
              velit, volutpat ultrices odio purus a elit. Proin elementum nisl
              dui. In ornare tempus sem, tincidunt volutpat est porttitor non.
              Quisque aliquam lacus at commodo rhoncus. Fusce vulputate metus
              non tellus faucibus, non tempus elit aliquet. Donec leo mi,
              faucibus non venenatis ut, pellentesque eget purus. Maecenas
              luctus ut tortor nec dictum. Donec at placerat nulla, sed euismod
              diam. Nullam eget tempor leo. Aliquam sit amet massa et tortor
              vehicula aliquam. In leo felis, rhoncus non egestas vel, auctor eu
              massa. Nulla suscipit accumsan neque, non fermentum massa
              elementum semper. Nullam euismod nisl quis magna aliquet, ac
              pellentesque velit pretium.
            </p>
            <p>
              Nullam laoreet elementum urna rhoncus rutrum. Quisque ullamcorper
              luctus est eget viverra. Aenean faucibus ligula sed facilisis
              dignissim. Duis tincidunt, sem et dictum interdum, dolor nisi
              congue nulla, tristique placerat metus magna ac est. Quisque
              convallis laoreet sapien. Proin leo dolor, tincidunt eu eleifend
              sed, interdum id tellus. Orci varius natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus. Nam vitae dapibus
              turpis, eu venenatis nibh. Suspendisse facilisis mollis lacus nec
              placerat. Quisque accumsan leo tellus, eget aliquet tortor
              faucibus sit amet. Sed quis molestie arcu. Curabitur orci nulla,
              molestie a nulla quis, aliquet hendrerit nisi. Proin hendrerit
              elit arcu, in eleifend risus interdum id. Curabitur vulputate
              massa ac ipsum tincidunt, id euismod sem euismod.
            </p>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    name="tandc"
                    type="checkbox"
                    checked={agreetandc}
                    onChange={e => {
                      setAgreetandc(e.target.checked);
                    }}
                  />
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    name="tandc"
                    type="checkbox"
                    checked={box2}
                    onChange={e => {
                      setBox2(e.target.checked);
                    }}
                  />
                  and to this
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    name="tandc"
                    type="checkbox"
                    checked={box3}
                    onChange={e => {
                      setBox3(e.target.checked);
                    }}
                  />
                  and this as well
                </label>
              </div>
            </div>
          </ModalBody>
          <footer className="modal-card-foot">
            <button
              disabled={!enableSubmit}
              onClick={onSetAgreed}
              className="button is-success"
            >
              Continue
            </button>
          </footer>
        </ModalCard>
      </TCmodal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    agreed: state.agreed
  };
};

const mapDispachToProps = dispatch => {
  return {
    onSetAgreed: () => dispatch({ type: "AGREE_TANDC" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Comp);
