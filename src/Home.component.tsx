import React from "react";
import { Divider, Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const Home: React.FC = () => (
  <Typography>
    <Title>Introduction</Title>
    <Paragraph>
      In the process of internal desktop applications development, many
      different design specs and implementations would be involved, which might
      cause designers and developers difficulties and duplication and reduce the
      efficiency of development.
    </Paragraph>
    <Paragraph>
      After massive project practice and summaries, I have found and used a
      couple of technologies that helped me to make my life easier and even more
      fun while I develop applications in the process:
    </Paragraph>

    <Title>
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        alt="antd_logo"
        width={80}
        height={80}
      />
      Ant Design components
    </Title>
    <Paragraph>
      We supply a series of design principles, practical patterns and high
      quality design resources (<Text code>Sketch</Text> and{" "}
      <Text code>Axure</Text>), to help people create their product prototypes
      beautifully and efficiently.
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a href="https://ant.design/" target="_blank" rel="noreferrer">
            Go to website
          </a>
        </li>
      </ul>
    </Paragraph>

    <Divider />

    <Title>
      <img
        src="https://react-query-v3.tanstack.com/_next/static/images/logo-7a7896631260eebffcb031765854375b.svg"
        width={240}
        height={47}
        alt="React Query"
      />
    </Title>
    <Paragraph>
      Performant and powerful data synchronization for React. Fetch, cache and
      update data in your React and React Native applications all without
      touching any "global state".
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a
            href="https://react-query-v3.tanstack.com/"
            target="_blank"
            rel="noreferrer"
          >
            Go to website
          </a>
        </li>
      </ul>
    </Paragraph>

    <Divider />

    <Title>
      <img
        src="https://styled-components.com/logo.png"
        width={125}
        height={125}
        alt="styled components"
        style={{ backgroundColor: "black" }}
      />
    </Title>
    <Paragraph>
      styled-components allows you to write actual CSS code to style your
      components. It also removes the mapping between components and styles –
      using components as a low-level styling construct could not be easier!.
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <a
            href="https://styled-components.com/"
            target="_blank"
            rel="noreferrer"
          >
            Go to website
          </a>
        </li>
      </ul>
    </Paragraph>
  </Typography>
);

export default Home;
