import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { accountSelectors } from "../store/account/selectors";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { InputGroup } from "../design-system/InputGroup";
import { FormattedAddress } from "../components/FormattedAddress";
import styled from "../design-system/styled";
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";

const MapContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 160px;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const options = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

export function ConfirmGP() {
  const history = useHistory();
  const patient = useSelector(accountSelectors.getPatient);
  const [confirmGP, setConfirmGP] = useState("yes");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      history.push("/nominate-echo");
    }, 250);
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={3} />
          <Divider />
          <Heading size={4} fontFamily="display">
            Is this {patient.isNoK ? "their" : "your"} GP?
          </Heading>
          <List gap={3}>
            <MapContainer>
              <Iframe
                id="gmap_canvas"
                src={`https://maps.google.com/maps?q=${encodeURI(
                  patient.gpSurgery.name || patient.gpSurgery.postcode
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                frameBorder="0"
                scrolling="no"
              />
            </MapContainer>
            <FormattedAddress address={patient.gpSurgery} />
          </List>
          <InputGroup
            selectionMode="single"
            items={options.map((option) => ({
              key: `action_${option.value}`,
              name: "confirmGP",
              checked: Boolean(confirmGP === option.value),
              onChange: () => {
                setConfirmGP(option.value);
              },
              labelText: option.label,
            }))}
          />
          <Divider />
          <CardActions>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <Button onClick={onSubmit} isLoading={isSubmitting}>
              Continue
            </Button>
          </CardActions>
        </Card>
      </PageContents>
    </>
  );
}
