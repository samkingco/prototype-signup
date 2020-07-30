import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useDispatch, useSelector } from "react-redux";
import { accountSelectors } from "../store/account/selectors";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { setAccountDetails } from "../store/account/slice";
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";
import { TextButton } from "../design-system/TextButton";

export function VerifyEmail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector(accountSelectors.getAccount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setAccountDetails({ emailVerified: true }));
      setIsSubmitting(false);
      history.push("/add-phone");
    }, 500);
  }

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={2} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Check your email
            </Heading>
            <Text>
              We’ve sent an email to{" "}
              <Text isBold={true} isInline={true}>
                {account.email}
              </Text>
              .
            </Text>
            <Text>
              In the email, click{" "}
              <Text isBold={true} isInline={true}>
                Confirm email address
              </Text>
              . This makes sure we have the right email address for you.
            </Text>
          </List>
          <Divider />
          <CardActions>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <Button onClick={onSubmit} isLoading={isSubmitting}>
              I’ve confirmed my email
            </Button>
          </CardActions>
        </Card>

        <Card>
          <List gap={1}>
            <Text isBold={true}>Used the wrong email address?</Text>
            <TextButton onClick={() => history.push("/change-email")}>
              Change email address
            </TextButton>
          </List>
          <Divider />
          <List gap={1}>
            <Text isBold={true}>Not received the email?</Text>
            <Text>
              It might take a few minutes to arrive. If you still don’t see it,
              check your spam folder.
            </Text>
            <TextButton onClick={() => history.push("/resend-email")}>
              Resend email
            </TextButton>
          </List>
        </Card>
      </PageContents>
    </>
  );
}
