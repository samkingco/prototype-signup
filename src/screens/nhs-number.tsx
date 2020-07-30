import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDetails } from "../store/account/slice";
import { accountSelectors } from "../store/account/selectors";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";
import { DualOption } from "../design-system/DualOption";

export function NHSNumber() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(accountSelectors.getPatient);
  const [knowsNHSNumber, setKnowsNHSNumber] = useState(
    patient.knowsNHSNumber ? "yes" : "no"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    {
      value: "yes",
      title: "Yes",
      description: `Great! This will help us find ${
        patient.isNoK ? "them" : "you"
      } on the NHS system.`,
    },
    {
      value: "no",
      title: "No",
      description: "No problem. We’ll just need a few more details from you.",
    },
  ];

  function onSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setPatientDetails({ knowsNHSNumber: knowsNHSNumber === "yes" }));
      setIsSubmitting(false);
      history.push("/nhs-details");
    }, 250);
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={3} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Do you know {patient.isNoK ? "their" : "your"} NHS number?
            </Heading>
            <Text>
              You can find this on any document sent to{" "}
              {patient.isNoK ? "them" : "you"} by the NHS.
            </Text>
          </List>
          <DualOption
            selectionMode="single"
            items={options.map((option) => ({
              key: `action_${option.value}`,
              name: "knowsNHSNumber",
              title: option.title,
              description: option.description,
              checked: Boolean(knowsNHSNumber === option.value),
              onChange: () => {
                setKnowsNHSNumber(option.value);
              },
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
