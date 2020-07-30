import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { accountSelectors } from "../store/account/selectors";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { InputGroup } from "../design-system/InputGroup";
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";
import { setPatientDetails } from "../store/account/slice";

export function NominateEcho() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(accountSelectors.getPatient);
  const [nominateOnSignup, setNominateOnSignup] = useState(
    patient.nominateOnSignup ? "yes" : "no"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    {
      value: "yes",
      label: `Yes, make Echo ${
        patient.isNoK ? "their" : "my"
      } nominated pharmacy`,
    },
    {
      value: "no",
      label: "No, I’ll take a look around first",
    },
  ];

  function onSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(
        setPatientDetails({ nominateOnSignup: nominateOnSignup === "yes" })
      );
      setIsSubmitting(false);
      history.push("/signup-complete");
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
              Ready to start using Echo?
            </Heading>
            <List gap={1}>
              <Text>
                {patient.isNoK ? "Their" : "Your"} nominated pharmacy is{" "}
                <Text isBold={true} isInline={true}>
                  Boots
                </Text>{" "}
                in{" "}
                <Text isBold={true} isInline={true}>
                  Hackney
                </Text>
                .
              </Text>
              <Text>
                To start using Echo, {patient.isNoK ? "they will" : "you’ll"}{" "}
                need to make us {patient.isNoK ? "their" : "your"} nominated
                pharmacy. This means {patient.isNoK ? "their" : "your"} GP will
                send any new electronic prescriptions to us.
              </Text>
              <Text>
                You can make us {patient.isNoK ? "their" : "your"} nominated
                pharmacy now, or wait until you place{" "}
                {patient.isNoK ? "their" : "your"} first order. It’s up to you.
              </Text>
            </List>
          </List>
          <InputGroup
            selectionMode="single"
            items={options.map((option) => ({
              key: `action_${option.value}`,
              name: "nominateOnSignup",
              checked: Boolean(nominateOnSignup === option.value),
              onChange: () => {
                setNominateOnSignup(option.value);
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
