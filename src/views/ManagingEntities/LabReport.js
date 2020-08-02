import React, { useEffect } from "react";
import { Page, Text, View, Font, Document, StyleSheet } from "@react-pdf/renderer";
import { UserHelper } from "../../context/contextHelper";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderColor: "#eceeef",
    borderWidth: 1,
    marginBottom: "2rem",
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    borderStyle: "solid",
    borderColor: "#eceeef",
    borderWidth: 1,
    padding: "1rem",
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

// Create Document Component
const LabReport = ({ user, teams, tHNames, membersNames }) => {
  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  useEffect(() => {
    console.log("should update");
  }, [teams, user]);

  return (
    <Document author={[user.firstName, user.lastName].join(" ")} keywords={[user.firstName, user.lastName].join(" ")} subject={[user.firstName, user.lastName].join(" ")} title={[user.firstName, user.lastName].join(" ")}>
      <Page style={styles.body}>
        <Text style={styles.title}>{`Laboratoire: ${UserHelper.userHeadedLaboratories(user)}`}</Text>
        <Text style={styles.subtitle}>{`Chef de laboratoire : ${[user.firstName, user.lastName].join(" ")}`}</Text>
        {tHNames.map((item, index) => (
          <View style={styles.body} key={index}>
            <Text style={styles.subtitle}>{`EQUIPE ${index + 1} : ${item.teamName}`}</Text>
            {item.headName === null ? <Text>Votre équipe n'a pas de chef d'équipe.</Text> : <Text style={styles.subtitle}>{`Chef d'équipe : ${item.headName}`}</Text>}
            {membersNames.length > 0 ? (
              <View style={styles.table}>
                {/* TableHeader */}
                <View style={styles.tableRow}>
                  <View style={{ ...styles.tableCol, width: "60%" }}>
                    <Text style={styles.tableCell}>Nom</Text>
                  </View>
                  <View style={{ ...styles.tableCol, width: "30%" }}>
                    <Text style={styles.tableCell}>Rôle</Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text>Vous n'avez aucun membre dans cette équipe.</Text>
            )}
            {membersNames.length > 0 &&
              membersNames
                .filter((mem) => mem.team_id === item.team_id && mem.memberId !== item.headId)
                .map((member, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={{ ...styles.tableCol, width: "60%" }}>
                      <Text style={styles.tableCell}>{member.memberName}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "30%" }}>
                      <Text style={styles.tableCell}>CHERCHEUR </Text>
                    </View>
                  </View>
                ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default LabReport;
