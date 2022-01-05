import Input from "components/settings/input";
import React from "react";
import { connect } from "react-redux"

const EditInformations = ({ user }) => {
  return (
    <div className="xl:px-32 xl:py-16 px-8 py-4">
      <div className="font-gibson font-semibold text-2xl mb-5 text-dark-500">
        Infos personnelles
      </div>
      <div className="grid grid-cols-5">
        <div className="bg-white col-span-4 space-x-6 rounded-3xl p-6">
          <div className="grid grid-cols-2 space-x-12">
            <div>
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
            </div>

            <div>
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
              <Input placeholder="Taper ici" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth
})

export default connect(mapStateToProps)(EditInformations);
