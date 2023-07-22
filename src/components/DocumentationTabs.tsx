"use client";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import SimpleBar from "simplebar-react";
import Code from "./Code";
import { nodejs, python } from "@/helpers/documentation-code";

const DocumentationTabs: FC = () => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">Node.js</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code language="javascript" show code={nodejs} animated />
        </SimpleBar>
        {/* <Code language="javascript" show code={nodejs} animated /> */}
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code language="python" show code={python} animated />
        </SimpleBar>
        {/* <Code language="python" show code={python} animated /> */}
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
