import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  H3,
  Icon,
  Text,
} from "native-base";
import { useMutation, useQuery } from "react-apollo";
import { Actions } from "react-native-router-flux";
// import * as Location from 'expo-location';
import moment from "moment-timezone";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import schema from "../utils/schema";
import NoData from "../components/NoData";
import FixedContainer from "../components/FixedContainer";
import AvatarItem from "../components/AvatarItem";
import HeavyBoxIcon from "../components/icons/HeavyBoxIcon";

function Page() {
  const { loading, error, data } = useQuery(schema.query.me);
  const [updateCurrentLocation] = useMutation(
    schema.mutation.updateCurrentLocation
  );
  const {
    getItem: globalCurrentLocation,
    setItem: setGlobalCurrentLocation,
  } = useAsyncStorage("currentLocation");

  const updateLocation = async () => {
    const { latitude, longitude } = JSON.parse(
      (await globalCurrentLocation()) ?? '{"latitude":"","longitude":""}'
    );
    updateCurrentLocation({ variables: { input: { latitude: Number(latitude), longitude: Number(longitude) } } });
  }

  useEffect(() => {
    updateLocation();
  }, []);

  if (loading) {
    return (
      <Container>
        <StatusBar />
        <Text>loading</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StatusBar />
        <Text>{JSON.stringify(error)}</Text>
      </Container>
    );
  }

  if (!data.me.currentJobs?.length) {
    return (
      <Container>
        <StatusBar />
        <NoData
          icon={<HeavyBoxIcon height="30%" />}
          title="No Jobs Now!"
          subtitle="Do you want to get a job now?"
          button={
            <Button onPress={() => Actions.jobRequest()}>
              <Text>Get a Job</Text>
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar />
      <Content>
        <FixedContainer pad>
          <H3 style={{ paddingTop: 12 }}>Current Job</H3>
          {data.me.currentJobs.map((job) => (
            <Card transparent key={job.jobId}>
              <AvatarItem item={job.order.sender} />
              <CardItem>
                <Body>
                  <Text>{job.order.status}</Text>
                  <Text note>
                    {`created ${moment
                      .tz(parseInt(job.order.createdAt), "Asia/Hong_Kong")
                      .format("YYYY-MM-DD HH:mm")}`}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Button
                  transparent
                  iconRight
                  style={{ marginLeft: "auto" }}
                  onPress={() => Actions.map({ job })}
                >
                  <Text>Detail</Text>
                  <Icon name="arrow-forward" />
                </Button>
              </CardItem>
            </Card>
          ))}
        </FixedContainer>
      </Content>
    </Container>
  );
}

export default Page;
