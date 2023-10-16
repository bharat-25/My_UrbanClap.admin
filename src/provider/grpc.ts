import { loadPackageDefinition } from "@grpc/grpc-js";
import { PackageDefinition, loadSync } from "@grpc/proto-loader";
import path from "path";
import { Observable } from "rxjs";

export class GRPCClass {
    public package: any;
    constructor(protoFileName: string, packageName: string) {
      this.loadProtoFile(protoFileName, packageName);
    }
    protected loadProtoFile(protoFileName: string, packageName: string): void {

        const packageDef: PackageDefinition = loadSync(
            path.resolve(__dirname, `${process.cwd()}/${protoFileName}`)
            );
      const grpcObject = loadPackageDefinition(packageDef);
      this.package = grpcObject[packageName];
    }
    protected invokeService<Type>(service: any, method: string, payload: Type) {
      try {
        return new Observable((subscriber: any) => {
          service[method](payload, (err: Error, res: any) => {
            if (err) {
              subscriber.error(err);
            } else {
                // console.log("hiii",{res})
                subscriber.next(res);
            }
          });
        });
      } catch (err) {
        console.log("Error occurs ", err);
        throw err;
      }
    }
  }
  