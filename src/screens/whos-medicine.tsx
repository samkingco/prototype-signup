import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDetails } from "../store/account/slice";
import { accountSelectors } from "../store/account/selectors";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { CardActions } from "../design-system/CardActions";
import { DualOption } from "../design-system/DualOption";
import SinglePerson from "../images/single-person.svg";
import NextOfKin from "../images/next-of-kin.svg";

const options = [
  {
    value: "myself",
    title: "Myself",
    description: "You can add other people once you’re all set up.",
    illustration: SinglePerson,
  },
  {
    value: "nok",
    title: "Someone I care for",
    description: "You can add yourself later if you need to.",
    illustration: NextOfKin,
  },
];

export function WhosMedicine() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(accountSelectors.getPatient);
  const [isNoK, setIsNoK] = useState(patient.isNoK ? "nok" : "myself");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setPatientDetails({ isNoK: isNoK === "nok" }));
      setIsSubmitting(false);
      history.push("/create-account");
    }, 250);
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Who will you be ordering medicine for?
            </Heading>
          </List>
          <DualOption
            selectionMode="single"
            items={options.map((option) => ({
              key: `action_${option.value}`,
              name: "isNoK",
              title: option.title,
              description: option.description,
              illustration: option.illustration,
              checked: Boolean(isNoK === option.value),
              onChange: () => {
                setIsNoK(option.value);
              },
            }))}
          />
          <Divider />
          <CardActions>
            <span />
            <Button onClick={onSubmit} isLoading={isSubmitting}>
              Continue
            </Button>
          </CardActions>
        </Card>
      </PageContents>
    </>
  );
}
