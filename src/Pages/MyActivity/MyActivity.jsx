import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MangeMyPost from '../ManageMyPost/MangeMyPost';
import MyBeVolunteerReq from '../MyBeVolunteerReq/MyBeVolunteerReq';
import { Helmet } from 'react-helmet-async';


const MyActivity = () => {
    return (
        <div data-aos="zoom-out-left"

        data-aos-delay="50"
        data-aos-duration="1000"
        
        data-aos-anchor-placement="top-center">
          <Helmet>
        <title>My activity</title>
      </Helmet>
            <Tabs>
  <div className='flex mt-5 items-center justify-center'>
        <TabList>
          <Tab>My Posts</Tab>
          <Tab>My requests</Tab>
        </TabList>
  </div>

    <TabPanel>
      <MangeMyPost></MangeMyPost>
    </TabPanel>
    <TabPanel>
     <MyBeVolunteerReq></MyBeVolunteerReq>
    </TabPanel>
  </Tabs>
        </div>
    );
};

export default MyActivity;