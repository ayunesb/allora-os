"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export const AiDecisionPanel = () => {
    const supabase = createClientComponentClient();
    const [versions, setVersions] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase
                .from("agent_versions")
                .select("*")
                .eq("agent_type", "plugin_assistant")
                .order("created_at", { ascending: true });
            setVersions(data || []);
            if (data?.length)
                setSelected(data[data.length - 1].id);
        };
        fetch();
    }, []);
    const current = versions.find((v) => v.id === selected);
    const prev = versions[versions.findIndex((v) => v.id === selected) - 1];
    return (<div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🧠 AI Agent Version Tracker</h1>

      <Tabs defaultValue={selected || ""} onValueChange={setSelected}>
        <TabsList>
          {versions.map((v) => (<TabsTrigger key={v.id} value={v.id}>
              {v.version}
            </TabsTrigger>))}
        </TabsList>

        <TabsContent value={selected || ""}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="p-4">
              <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Previous Prompt</h2>
              <pre className="text-xs whitespace-pre-wrap">{prev?.prompt || "N/A"}</pre>
            </Card>
            <Card className="p-4">
              <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Current Prompt</h2>
              <pre className="text-xs whitespace-pre-wrap">{current?.prompt}</pre>
            </Card>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <strong>Changelog:</strong> {current?.changelog || "N/A"}
            <br />
            <span className="text-xs">Created at: {new Date(current?.created_at || "").toLocaleString()}</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>);
};
